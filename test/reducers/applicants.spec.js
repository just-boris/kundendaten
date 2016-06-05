import AxiosMock from 'axios-mock-adapter';
import axious from 'axios';
import {combineReducers} from 'redux';
import createStore from '../../src/store';
import applicants from '../../src/reducers/applicants';
import {loadApplicants, saveApplicants, addApplicant, removeApplicant, updateApplicant} from '../../src/actions';

describe('applicants reducer', function() {
    beforeEach(function() {
        this.server = new AxiosMock(axious);
        this.store = createStore(combineReducers({applicants}));
        this.getApplicants = () => this.store.getState().applicants;
        this.getApplicant = (index) => this.getApplicants()[index];
    });

    afterEach(function() {
        this.server.restore();
    });

    it('should load applicants by id', function() {
        this.server.onGet('/api/accounts/1').reply(200, {
          id: 1,
          applicants: [{personal: {firstName: 'Tester'}}]
        });
        return this.store.dispatch(loadApplicants(1)).then(() => {
            expect(this.getApplicant(0)).toBeImmutable({personal: {firstName: 'Tester'}});
        });
    });

    it('should add and remove applicant', function() {
        this.store.dispatch(addApplicant());
        expect(this.getApplicants()).toHaveLength(2);
        this.store.dispatch(removeApplicant(1));
        expect(this.getApplicants()).toHaveLength(1);
    });

    it('should update applicant by index and field name', function() {
        this.store.dispatch(updateApplicant(0, 'personal.name', 'Tester'));
        expect(this.getApplicant(0)).toBeImmutable({
            personal: {name: 'Tester'}
        });
    });

    it('should save applicants data to server', function() {
        this.store.dispatch(updateApplicant(0, 'personal.lastName', 'User'));
        this.server.onPut('/api/accounts/1').reply(config => {
            const expectedResponse = {
                id: 1,
                applicants: [{personal: {lastName: 'User'}}]
            };
            expect(config.data).toEqual(JSON.stringify(expectedResponse));
            return [200, expectedResponse];
        });

        return this.store.dispatch(saveApplicants(1)).then(response => {
            expect(response.data.applicants).toExist();
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
