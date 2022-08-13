import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// AuthGuard('jwt')と入れることで, jwt.strategy.tsを使ってガードするように設定
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }