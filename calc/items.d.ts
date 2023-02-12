import { Generation, TypeName, StatID } from './data/interface';
export declare const SEED_BOOSTED_STAT: {
    [item: string]: StatID;
};
export declare function getItemBoostType(item: string | undefined): "전기" | "에스퍼" | "노말" | "격투" | "비행" | "독" | "땅" | "바위" | "벌레" | "고스트" | "강철" | "불꽃" | "물" | "풀" | "얼음" | "드래곤" | "악" | "페어리" | undefined;
export declare function getBerryResistType(berry: string | undefined): "전기" | "에스퍼" | "노말" | "격투" | "비행" | "독" | "땅" | "바위" | "벌레" | "고스트" | "강철" | "불꽃" | "물" | "풀" | "얼음" | "드래곤" | "악" | "페어리" | undefined;
export declare function getFlingPower(item?: string): 0 | 10 | 30 | 100 | 40 | 60 | 50 | 85 | 20 | 130 | 110 | 95 | 90 | 80 | 70;
export declare function getNaturalGift(gen: Generation, item: string): {
    t: TypeName;
    p: number;
};
export declare function getTechnoBlast(item: string): "전기" | "불꽃" | "물" | "얼음" | undefined;
export declare function getMultiAttack(item: string): TypeName | undefined;
