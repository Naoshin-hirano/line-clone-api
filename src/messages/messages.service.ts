import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
    findAll() {
        return 'This is messages service'
    }
}
