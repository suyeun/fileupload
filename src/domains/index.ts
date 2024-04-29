//@index('./**/*.ts', f => f.path.includes('module') ? `export * from '${f.path}';` : "")
export * from "./shared/shared.module";

export * from "./shared/modules/index";

export * from "./shared/modules/redis-client.module";

export * from "./shared/modules/session.module";

export * from "./user/user.module";

export * from "./excel/excel.module";
