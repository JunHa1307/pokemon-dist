var PC_HANDLER = function () {
	setTimeout(performCalculations, 0);
};
var damageResults;

$("#p2 .ability").bind("keyup change", function () {
	autosetWeather($(this).val(), 1);
	autosetTerrain($(this).val(), 1);
});

$("#p2 .item").bind("keyup change", function () {
	autosetStatus("#p2", $(this).val());
});

lastManualStatus["#p2"] = "Healthy";
lastAutoStatus["#p1"] = "Healthy";

var resultLocations = [[], []];
for (var i = 0; i < 4; i++) {
	resultLocations[0].push({
		"move": "#resultMoveL" + (i + 1),
		"damage": "#resultDamageL" + (i + 1)
	});
	resultLocations[1].push({
		"move": "#resultMoveR" + (i + 1),
		"damage": "#resultDamageR" + (i + 1)
	});
}

function performCalculations() {
	var p1info = $("#p1");
	var p2info = $("#p2");
	var p1 = createPokemon(p1info);
	var p2 = createPokemon(p2info);
	var p1field = createField();
	var p2field = p1field.clone().swap();

	damageResults = calculateAllMoves(gen, p1, p1field, p2, p2field);
	p1 = damageResults[0][0].attacker;
	p2 = damageResults[1][0].attacker;
	var battling = [p1, p2];
	p1.maxDamages = [];
	p2.maxDamages = [];
	p1info.find(".sp .totalMod").text(p1.stats.spe);
	p2info.find(".sp .totalMod").text(p2.stats.spe);
	var fastestSide = p1.stats.spe > p2.stats.spe ? 0 : p1.stats.spe === p2.stats.spe ? "tie" : 1;

	var result, maxDamage;
	var bestResult;
	var zProtectAlerted = false;
	for (var i = 0; i < 4; i++) {
		// P1
		result = damageResults[0][i];
		maxDamage = result.range()[1] * p1.moves[i].hits;
		if (!zProtectAlerted && maxDamage > 0 && p1.item.indexOf(" Z") === -1 && p1field.defenderSide.isProtected && p1.moves[i].isZ) {
			alert('Although only possible while hacking, Z-Moves fully damage through protect without a Z-Crystal');
			zProtectAlerted = true;
		}
		p1.maxDamages.push({moveOrder: i, maxDamage: maxDamage});
		p1.maxDamages.sort(function (firstMove, secondMove) {
			return secondMove.maxDamage - firstMove.maxDamage;
		});
		$(resultLocations[0][i].move + " + label").text(p1.moves[i].name.replace("Hidden Power", "HP"));
		$(resultLocations[0][i].damage).text(result.moveDesc(notation));

		// P2
		result = damageResults[1][i];
		maxDamage = result.range()[1] * p2.moves[i].hits;
		if (!zProtectAlerted && maxDamage > 0 && p2.item.indexOf(" Z") === -1 && p2field.defenderSide.isProtected && p2.moves[i].isZ) {
			alert('Although only possible while hacking, Z-Moves fully damage through protect without a Z-Crystal');
			zProtectAlerted = true;
		}
		p2.maxDamages.push({moveOrder: i, maxDamage: maxDamage});
		p2.maxDamages.sort(function (firstMove, secondMove) {
			return secondMove.maxDamage - firstMove.maxDamage;
		});
		$(resultLocations[1][i].move + " + label").text(p2.moves[i].name.replace("Hidden Power", "HP"));
		$(resultLocations[1][i].damage).text(result.moveDesc(notation));

		// BOTH
		var bestMove;
		if (fastestSide === "tie") {
			// Technically the order should be random in a speed tie, but this non-determinism makes manual testing more difficult.
			// battling.sort(function () { return 0.5 - Math.random(); });
			bestMove = battling[0].maxDamages[0].moveOrder;
			var chosenPokemon = battling[0] === p1 ? "0" : "1";
			bestResult = $(resultLocations[chosenPokemon][bestMove].move);
		} else {
			bestMove = battling[fastestSide].maxDamages[0].moveOrder;
			bestResult = $(resultLocations[fastestSide][bestMove].move);
		}
	}
	if ($('.locked-move').length) {
		bestResult = $('.locked-move');
	} else {
		stickyMoves.setSelectedMove(bestResult.prop("id"));
	}
	bestResult.prop("checked", true);
	bestResult.change();
	$("#resultHeaderL").text(i18next.t(p1.name) + "의 기술 (선택하시면 결과를 계산합니다)");
	$("#resultHeaderR").text(i18next.t(p2.name) + "의 기술 (선택하시면 결과를 계산합니다)");
}

$(".result-move").change(function () {
	if (damageResults) {
		// 1) i18next 서비스에서 리소스 스토어에 직접 접근
		//    v19+ 버전부터는 i18next.services.resourceStore.data 에 저장됩니다.

		// 2) 현재 언어(i18next.language)와 네임스페이스들을 순회하면서
		//    모든 키를 모아 플래트닝(flatten)합니다.
		function getAllKeys() {
			const resourceStore = i18next.services.resourceStore.data;
			const lang = i18next.language;
			const namespaces = Object.keys(resourceStore[lang] || {});
			const keys = [];

			namespaces.forEach(ns => {
				const bundle = resourceStore[lang][ns];
				// bundle 이 중첩 객체면 재귀로 키를 뽑아야 합니다:
				function recurse(obj, prefix = '') {
				Object.entries(obj).forEach(([k, v]) => {
					const path = prefix ? `${prefix}.${k}` : k;
					if (typeof v === 'string') {
					keys.push(path);
					} else if (typeof v === 'object') {
					recurse(v, path);
					}
				});
				}
				recurse(bundle);
			});

			// 중복 제거
			return Array.from(new Set(keys));
		}

		// 3) 특수문자 이스케이프 헬퍼
		function escapeRegExp(str) {
			return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		}
		// 4) 모듈 로딩 시 단 한 번 RegExp 빌드
		const allKeys = getAllKeys().sort((a, b) => b.length - a.length);
		const pattern = new RegExp(allKeys.map(escapeRegExp).join('|'), 'g');

		// 5) 텍스트 인라인 번역 함수
		function translateInline(text) {
			return text.replace(pattern, key => i18next.t(key));
		}

		var result = findDamageResult($(this));
		if (result) {
			var desc = translateInline(result.fullDesc(notation, false));
			if (desc.indexOf('--') === -1) desc += ' -- 최악의 결과가 예상됨';
			$("#mainResult").text(desc);
			var summary = displayDamageHits(result.damage);
			var rest = "";
			var newLine = summary.indexOf('\n');
			if (newLine > -1) {
				rest = summary.substring(newLine + 1);
				summary = summary.substring(0, newLine);
			}
			$("#firstDmgValues").text("Possible damage amounts: (" + summary + ")");
			if (rest !== "") $("#restDmgValues").text("(" + rest + ")");

			if (rest.trim() === "") {
				$("#firstDmgValues").css("display", "block");
				$("#restDmgValues").text("");
			} else {
				$("#damageValues").removeAttr("open");
				$("#firstDmgValues").css("display", "revert");
			}
		}
	}
});

function displayDamageHits(damage) {
	// Fixed Damage
	if (typeof damage === 'number') return damage.toString();
	// Standard Damage
	if (damage.length > 2 && typeof damage[0] === 'number')
		return damage.join(', ');
	// Fixed Parental Bond Damage
	if (typeof damage[0] === 'number' && typeof damage[1] === 'number') {
		return '1st Hit: ' + damage[0] + '; 2nd Hit: ' + damage[1];
	}
	// Multihit Damage
	var fullText = "";
	for (var i = 1; i <= damage.length; i++) {
		var txt = toOrdinal(i) + " Hit: " + damage[i - 1].join(', ');
		if (i > 1 && i < damage.length) txt += "; ";
		fullText += txt;
		if (i % 2 == 1 && i < damage.length) fullText += "\n";
	}
	return fullText;
}

function toOrdinal(num) {
	if (typeof num !== "number" || !Number.isInteger(num)) {
		return "Input must be an integer.";
	}
	switch (num) {
	case 1:
		return num + "st";
	case 2:
		return num + "nd";
	case 3:
		return num + "rd";
	default:
		return num + "th";
	}
}

function findDamageResult(resultMoveObj) {
	var selector = "#" + resultMoveObj.attr("id");
	for (var i = 0; i < resultLocations.length; i++) {
		for (var j = 0; j < resultLocations[i].length; j++) {
			if (resultLocations[i][j].move === selector) {
				return damageResults[i][j];
			}
		}
	}
}

function checkStatBoost(p1, p2) {
	if ($('#StatBoostL').prop("checked")) {
		for (var stat in p1.boosts) {
			if (stat === 'hp') continue;
			p1.boosts[stat] = Math.min(6, p1.boosts[stat] + 1);
		}
	}
	if ($('#StatBoostR').prop("checked")) {
		for (var stat in p2.boosts) {
			if (stat === 'hp') continue;
			p2.boosts[stat] = Math.min(6, p2.boosts[stat] + 1);
		}
	}
}

function calculateAllMoves(gen, p1, p1field, p2, p2field) {
	checkStatBoost(p1, p2);
	var results = [[], []];
	for (var i = 0; i < 4; i++) {
		results[0][i] = calc.calculate(gen, p1, p2, p1.moves[i], p1field);
		results[1][i] = calc.calculate(gen, p2, p1, p2.moves[i], p2field);
	}
	return results;
}

$(".mode").change(function () {
	var params = new URLSearchParams(window.location.search);
	params.set('mode', $(this).attr("id"));
	var mode = params.get('mode');
	if (mode === 'randoms') {
		window.location.replace('randoms.html?' + params);
	} else if (mode === 'one-vs-one') {
		window.location.replace('index.html?' + params);
	} else if (mode === "oms") {
		window.location.replace('oms.html');
	} else {
		window.location.replace('honkalculate.html?' + params);
	}
});

$(".notation").change(function () {
	performCalculations();
});

$(document).ready(function () {
	var params = new URLSearchParams(window.location.search);
	var m = params.get('mode');
	if (m) {
		if (m !== 'one-vs-one' && m !== 'randoms') {
			window.location.replace('honkalculate.html?' + params);
		} else {
			if ($('#randoms').prop('checked')) {
				if (m === 'one-vs-one') {
					window.location.replace('index.html?' + params);
				}
			} else {
				if (m === 'randoms') {
					window.location.replace('randoms.html?' + params);
				}
			}
		}
	}

	var importParam = params.get('import');
	if (importParam) {
		try {
			var decodedImport = atob(importParam); // Decode base64
			$('.import-team-text').val(decodedImport); // Set value to text area
		} catch (e) {
			console.error('Failed to decode Import parameter:', e);
		}
	}

	$(".calc-trigger").bind("change keyup", PC_HANDLER);
	performCalculations();
});

/* Click-to-copy function */
$("#mainResult").click(function () {
	navigator.clipboard.writeText($("#mainResult").text()).then(function () {
		document.getElementById('tooltipText').style.visibility = 'visible';
		setTimeout(function () {
			document.getElementById('tooltipText').style.visibility = 'hidden';
		}, 1500);
	});
});
