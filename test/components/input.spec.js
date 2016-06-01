import Input from '../../src/components/input';
import {createSpy} from 'expect';
import {mount} from 'enzyme';

describe('Input', function() {
    beforeEach(function() {
        this.onChange = createSpy();
        this.component = mount(<Input label="Some text" name="text" onChange={this.onChange} />);
    });

    it('should render value', function() {
        expect(this.component.find('.input__control').prop('value')).toEqual('');
        this.component.setProps({value: 'testing...'});
        expect(this.component.find('.input__control').prop('value')).toEqual('testing...');
    });

    it('should update component state after input change', function() {
        this.component.find('.input__control').simulate('change', {target: {value: 'text'}});
        expect(this.component.state('value')).toEqual('text');
        expect(this.component.find('.input__control').prop('value')).toEqual('text');
    });

    it('should report change on field blur', function() {
        this.component.find('.input__control').simulate('blur', {target: {name: 'text', value: 'test content'}});
        expect(this.onChange).toHaveBeenCalledWith('text', 'test content');
    });
});
