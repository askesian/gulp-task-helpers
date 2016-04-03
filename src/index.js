import _isUndefined from 'lodash/isUndefined';

import Situation from './Situation';
import TaskMaker from './TaskMaker';

class GulpHelpers {

	taskMaker(gulp) {
		if (_isUndefined(gulp)) {
			throw new ReferenceError('Gulp must be passed as a parameter to taskMaker', 'index.js', 32);
		}
		this._gulp = gulp;

		if (!this.tm) {
			this.tm = new TaskMaker(gulp);
		}
		return this.tm;
	}

	situation() {
		if (_isUndefined(this.sit)) {
			this.sit = new Situation();
		}
		return this.sit;
	}

	framework(name) {
		if (_isUndefined(this.frameworks)) {
			this.frameworks = {};
		}

		if (_isUndefined(this.frameworks[name])) {
			if (name === 'lodash' || name === '_') {
				this.frameworks[name] = require('lodash');
			} else if (name === 'run-sequence') {
				this.frameworks[name] = require('run-sequence').use(this._gulp);
			}
		}
		return this.frameworks[name];
	}
}

export default new GulpHelpers();
