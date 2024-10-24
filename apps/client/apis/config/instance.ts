import { Api as ClubApi } from '../__generated__/club/swagger';
import { Api as ApplicationApi } from '../__generated__/application/swagger';

const clubApi = new ClubApi();
const applicationApi = new ApplicationApi();

export { clubApi, applicationApi };
