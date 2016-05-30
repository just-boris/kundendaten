import {createStore} from 'redux';
import applicants from '../../src/reducers/applicants';
import {addApplicant, removeApplicant, updateApplicant} from '../../src/actions';

describe('applicants reducer', function() {
    beforeEach(function() {
        this.store = createStore(applicants);
        this.getApplicant = (index) => this.store.getState()[index];
    });

    it('should add applicant', function() {
        this.store.dispatch(addApplicant());
        expect(this.store.getState()).toHaveLength(2);
    });

    it('should remove applicant', function() {
        const applicant = this.getApplicant(0);
        this.store.dispatch(removeApplicant(applicant));
        expect(this.store.getState()).toHaveLength(0);
    });

    it('should update applicant by index and field name', function() {
        this.store.dispatch(updateApplicant(0, 'personal.name', 'Tester'));
        expect(this.getApplicant(0)).toBeImmutable({
            personal: {name: 'Tester'},
            total: 0
        });
    });

    it('should calculate total value', function() {
        this.store.dispatch(updateApplicant(0, 'income.salary', 1000));
        this.store.dispatch(updateApplicant(0, 'income.other', 10));
        expect(this.getApplicant(0).get('total')).toBe(1010);
        this.store.dispatch(updateApplicant(0, 'expense.rent', 400));
        this.store.dispatch(updateApplicant(0, 'expense.other', 10));
        expect(this.getApplicant(0).get('total')).toBe(600);
    });
});
