import User from './User/User';
import Token from './Token/Token';
import DomainSchema from './Domain/DomainSchema';
import LogSchema from './Log/LogSchema';
import Domain from './Domain/Domain';
import Log from './Log/Log';
import Channel from './Channel/Channel';
import Rate from './Rate/Rate';

export default function () {
  return {
    Domain: Domain(...arguments),
    Log: Log(...arguments),
    Rate: Rate(...arguments),
    User: User(...arguments),
    Token: Token(...arguments),
    Channel: Channel(...arguments),
    scheme: {
      DomainSchema,
      LogSchema,
    }
  }
}
