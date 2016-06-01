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
            personal: {name: 'Tester'}
        });
    });

    describe('two applicants', function() {
        beforeEach(function() {
            this.store.dispatch(addApplicant());
        });

        it('should copy houselhold data after sharedHousehold flag change', function() {
            this.store.dispatch(updateApplicant(0, 'household.accomodationType', 'RENT'));
            this.store.dispatch(updateApplicant(1, 'household.shared', true));
            expect(this.getApplicant(0)).toBeImmutable({
                household: {
                    accomodationType: 'RENT'
                }
            });
            expect(this.getApplicant(1)).toBeImmutable({
                household: {
                    accomodationType: 'RENT',
                    estateType: undefined,
                    numberOfChildren: undefined,
                    numberOfPersons: undefined,
                    shared: true
                }
            });
        });

        it('should sync data for shared households', function() {
            this.store.dispatch(updateApplicant(1, 'household.shared', true));
            this.store.dispatch(updateApplicant(0, 'household.numberOfPersons', 3));
            expect(this.getApplicant(0)).toBeImmutable({
                household: {
                    numberOfPersons: 3
                }
            });
            expect(this.getApplicant(1)).toBeImmutable({
                household: {
                    numberOfPersons: 3,
                    accomodationType: undefined,
                    estateType: undefined,
                    numberOfChildren: undefined,
                    shared: true
                }
            });
        });

        it('should not sync households for not shared', function() {
            this.store.dispatch(updateApplicant(1, 'household.shared', false));
            this.store.dispatch(updateApplicant(1, 'household.numberOfPersons', 1));
            this.store.dispatch(updateApplicant(0, 'household.numberOfPersons', 2));
            expect(this.getApplicant(0)).toBeImmutable({
                household: {
                    numberOfPersons: 2
                }
            });
            expect(this.getApplicant(1)).toBeImmutable({
                household: {
                    numberOfPersons: 1,
                    shared: false
                }
            });
        });
    });
});
