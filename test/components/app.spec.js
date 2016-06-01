import {shallow} from 'enzyme';
import {createSpy} from 'expect';
import {fromJS} from 'immutable';
import {App} from '../../src/components/app';

const defaultApplicants = [
    fromJS({personal: {name: 'First', lastName: 'User'}})
];

function Page(wrapper) {
    this.applicants = () => wrapper.find('.app__row.applicants').children();
    this.applicant = (index) => this.applicants().at(index);
}

function setup(applicants = defaultApplicants) {
    const addApplicant = createSpy();
    const removeApplicant = createSpy();
    const component = shallow(<App {...{addApplicant, removeApplicant, applicants}} />);
    const page = new Page(component);
    return {component, page, addApplicant, removeApplicant};
}

describe('App', function() {
    it('should render two applicant', function() {
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
