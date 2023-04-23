import { User } from './user.model';

export class UserParams{
    gender: string;
    minAge = 18;
    maxAge = 99;
    page = 1;
    size = 5;
    orderBy = 'lastActive';

    constructor(user: User){
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}
