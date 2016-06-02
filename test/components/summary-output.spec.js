import SummaryOutput from '../../src/components/summary-output';
import path from '../../src/util/path';
import {Map} from 'immutable';
import {mount} from 'enzyme';

describe('SummaryOutput', function() {
    beforeEach(function() {
        this.applicant = new Map({});
        this.component = mount(<SummaryOutput applicant={this.applicant} />);
    });

    it('should render total zero as default value', function() {
        expect(this.component.find('.input__display').text()).toEqual('0');
    });

    it('should calculate and render total', function() {
        this.applicant =  this.applicant.withMutations(state => {
            state.setIn(path('income.salary'), 1000);
            state.setIn(path('income.other'), 10);
        });
        this.component.setProps({applicant: this.applicant});
        expect(this.component.find('.input__display').text()).toEqual('1010');

        this.applicant =  this.applicant.withMutations(state => {
            state.setIn(path('expense.rent'), 400);
            state.setIn(path('expense.other'), 10);
        });
        this.component.setProps({applicant: this.applicant});
        expect(this.component.find('.input__display').text()).toEqual('600');
    });
});
