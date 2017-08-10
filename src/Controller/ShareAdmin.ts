import { Core } from '../lib';

@Core.Route.Controller({
    service: 'share-admin',
})
export default class extends Core.Route.BaseRoute implements Core.Route.IRoute {
    doAction(action: string, method: string, next) {

        return this.index;
    }
    async before() {
        await this.next()
    }
    after() { }

    index() {
        this.ctx.body = 'hello';
    }
} 