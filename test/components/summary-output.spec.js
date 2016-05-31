import SummaryOutput from '../../src/components/summary-output';
import path from '../../src/util/path';
import {Map} from 'immutable';
import {mount} from 'enzyme';

describe('SummaryOutput', function() {
    beforeEach(function() {
        this.applicants = [new Map({})];
        this.component = mount(<SummaryOutput applicants={this.applicants} />);
        this.updateApplicants = (applicants) => {
            this.applicants = applicants;
            this.component.setProps({applicants: this.applicants});
        };
    });

    it('should render total zero as default value', function() {
        expect(this.component.find('.input__display').text()).toEqual('0');
    });

    it('should calculate and render total', function() {
        this.applicants[0] = this.applicants[0].withMutations(state => {
            state.setIn(path('income.salary'), 1000);
            state.setIn(path('income.other'), 10);
        });
        this.updateApplicants(this.applicants);
        expect(this.component.find('.input__display').text()).toEqual('1010');

        this.applicants[0] = this.applicants[0].withMutations(state => {
            state.setIn(path('expense.rent'), 400);
            state.setIn(path('expense.other'), 10);
        });
        this.updateApplicants(this.applicants);
        expect(this.component.find('.input__display').text()).toEqual('600');
    });


    it('should render summary for two applicants', function() {
        this.updateApplicants([new Map({}), new Map({})]);
        expect(this.component.find('.input__display')).toHaveLength(2);
    });
});
