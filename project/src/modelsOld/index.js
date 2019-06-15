import User from './User/User';
import Token from './Token/Token';
import DomainSchema from './Domain/DomainSchema';
import Domain from './Domain/Domain';
import Channel from './Channel/Channel';
import Rate from './Rate/Rate';

export default function () {
  return {
    Domain: Domain(...arguments),
    Rate: Rate(...arguments),
    User: User(...arguments),
    Token: Token(...arguments),
    Channel: Channel(...arguments),
    scheme: {
      DomainSchema,
    }
  }
}
