import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.config";
import { Request } from 'express';



export class Adminguard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('You are not authorised to access this route');
        }
        try {
            const payload = await verify(token, JWT_SECRET);
            if(!payload){
                throw new UnauthorizedException('You have no access to this route')
            }
            request.user = payload;
            return true

            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers

        } catch {
            throw new UnauthorizedException('Unidentified Individual ');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

