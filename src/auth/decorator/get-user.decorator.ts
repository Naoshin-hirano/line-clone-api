import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// リクエストしたUser情報を取得
// ExecutinoContext: 実行中の一連の処理の全ての情報を含んでいる
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
    // 実行中の一連の処理の情報でなにが必要か示す(今はHTTP情報)
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});