import {mount} from 'enzyme';
import {createSpy} from 'expect';
import {fromJS} from 'immutable';
import {Account} from '../../src/components/account';

const defaultApplicants = [
    fromJS({personal: {name: 'First', lastName: 'User'}})
];

function Page(wrapper) {
    this.applicants = () => wrapper.find('.app__applicant');
    this.applicant = (index) => this.applicants().at(index);
}

function setup(applicants = defaultApplicants, accountId) {
    const addApplicant = createSpy();
    const removeApplicant = createSpy();
    const loadApplicants = createSpy().andReturn(Promise.resolve());
    const component = mount(<Account {...{loadApplicants, addApplicant, removeApplicant, applicants, params: {accountId}}} />);
    const page = new Page(component);
    return {component, page, loadApplicants, addApplicant, removeApplicant};
}

describe('App', function() {
    it('should request applicants on render', function() {
        const {loadApplicants} = setup([], 1);
        expect(loadApplicants).toHaveBeenCalledWith(1);
    });

    it('should add second applicant', function() {
        const {page, addApplicant} = setup();
        expect(page.applicants()).toHaveLength(1);
        page.applicant(0).find('.app__action').simulate('click');
        expect(addApplicant).toHaveBeenCalled();
    });

    it('should render two applicants', function() {
        const {page, removeApplicant} = setup([
            fromJS({personal: {name: 'First', lastName: 'User'}}),
            fromJS({personal: {name: 'Second', lastName: 'User'}})
        ]);
        expect(page.applicants()).toHaveLength(2);
        expect(page.applicant(0).find('.app__action')).toHaveLength(0);
        expect(page.applicant(1).find('.app__action')).toHaveLength(1);
        page.applicant(1).find('.app__action').simulate('click');
        expect(removeApplicant).toHaveBeenCalled();
    });
});
