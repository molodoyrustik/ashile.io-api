import Auth from './Auth/Auth';
import Domain from './Domain/Domain';
import Channel from './Channel/Channel';

export default function () {
  return {
    Auth: Auth(...arguments),
    Domain: Domain(...arguments),
    Channel: Channel(...arguments),
  }
}
