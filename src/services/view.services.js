import ViewDao from '../dao/view.dao.js';

class ViewService {
  constructor() {
    this.viewDao = new ViewDao();
  }
}

export default ViewService;
