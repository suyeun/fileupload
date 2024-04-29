//@index('./*.ts', f => f.path !== `./index` ? `export * from '${f.path}';` : "")
export * from "./excel.repository";

export * from "../../user/repositories/user.repository";
