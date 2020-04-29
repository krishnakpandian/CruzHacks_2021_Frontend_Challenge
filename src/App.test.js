import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { mount, shallow, render as testing } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Announcments from './components/Announcements';
import Register from './components/Register';

Enzyme.configure({ adapter: new Adapter() });


// Definitely Should have made my code more modular for testing I also don't have a lot to test 
// I also ran into some depency issues while installing jest so I am only using the built in jest features 
test('Main App Rendering', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

test('Announcements Rendering', () => {
  const { getByText } = render(<Announcments />);
  const wrapper = shallow(<Announcments />);
  expect(wrapper.find("Image").length).toEqual(0);  //This Shows the fetch Test didn't fail as the image didn't appear
});

test('Registration Rendering', () => {
  const { getByText } = render(<Register />);
  const linkElement = getByText(/Page/i);
  expect(linkElement).toBeInTheDocument();
});

it('Alphanumeric', () => {
  const wrapper = shallow(<Register />)
  expect(wrapper.instance().alphanumeric('Hello World')).toEqual(false);
  expect(wrapper.instance().alphanumeric('*')).toEqual(true);
  expect(wrapper.instance().alphanumeric('!')).toEqual(true);
  expect(wrapper.instance().alphanumeric('+')).toEqual(false);
  expect(wrapper.instance().alphanumeric('-')).toEqual(false);
  expect(wrapper.instance().alphanumeric('@')).toEqual(true);
  expect(wrapper.instance().alphanumeric('lowercase')).toEqual(false);
  expect(wrapper.instance().alphanumeric('CAPITAL')).toEqual(false);
  expect(wrapper.instance().alphanumeric('1234567890')).toEqual(false);
  expect(wrapper.instance().alphanumeric('~')).toEqual(true);
  expect(wrapper.instance().alphanumeric(':)')).toEqual(true);
  expect(wrapper.instance().alphanumeric('          ')).toEqual(false);
  expect(wrapper.instance().alphanumeric('')).toEqual(false);
});

it('Page Switching', () => {
  const wrapper = shallow(<Register />)
  wrapper.instance().nextPage()
  expect(wrapper.instance().state.page).toBe(2)
  wrapper.instance().prevPage()
  expect(wrapper.instance().state.page).toBe(1)
  wrapper.instance().resetPage()
  expect(wrapper.instance().state.page).toBe(1)
});


it('Validate', () => {
  const wrapper = mount(<Register />)
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'No', affiliation: '' });
  expect(wrapper.instance().validate()).toBe(2)
  expect(wrapper.state("hackathon_error")).toBe("Indicate you experience")
  //error is that Page 2 is not filled out
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'No', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(0)
  //Valid Froms
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: '', gender_string: 'Gender', graduation: '2020', student: 'No', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(0)
  //Valid Froms
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'Yes', affiliation: 'Nine', hackathon: 'Yes', participate: '', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(0)
  //Valid Froms
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'No', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "" });
  expect(wrapper.instance().validate()).toBe(0)
  expect(wrapper.state("hackathon_error")).toBe("")
  //Valid Froms
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian*', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'No', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(1)
  expect(wrapper.state("lname_error")).toBe("Alphanumeric and Punctuation only")
  //Invalid input on page 1 last name
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'No', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: '', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(3)
  //error is that Page 3 transportation is not filled out
  wrapper.setState({ fname: 'KrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of characters', 
  lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'No', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(1)
  //error is that Page 1 length of fname
  wrapper.setState({ fname: 'Krishnas', 
  lname: 'KrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of character Pandininninlsdkfsadjfkl', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'No', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(1)
  //error is that Page 1 length of lname
  wrapper.setState({ fname: 'kp', 
  lname: 'Pandian', age: '19', gender: '', gender_string: 'KrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of charactersKrishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnarishnaKrishnaKrishnaKrishnaThis is a lot of characters', 
  graduation: '2020', student: 'No', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(1)
  //error is that Page 1 is gender string length
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'Yes', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(1)
  //error is that Page 1 affiliation is not answered when it should be
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'No', affiliation: 'Stevenson', hackathon: 'Yes', participate: '', transportation: 'Yes', accomodations: "" });
  expect(wrapper.instance().validate()).toBe(1)
  //error is that Page 1 student is not from ucsc but fills out affiliation
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'Yes', affiliation: '10', hackathon: 'Yes', participate: 'insert', transportation: '', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(3)
  //Transporation is not answered on Page 3
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: 'Male', graduation: '2020', student: 'Yes', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(1)
  //error is that Page 1 both gender and the other option are filled in
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '20', student: 'Yes', affiliation: '', hackathon: 'Yes', participate: 'insert', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(1)
  //error is that Page 1 the graduation year format 
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '2020', student: 'Yes', affiliation: '10', hackathon: 'Yes', participate: '***', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(2)
  //error is that Page 2 has an invalid text input
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '19', gender: 'Male', gender_string: '', graduation: '20ab', student: 'Yes', affiliation: '10', hackathon: 'Yes', participate: '***', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(1)
  //error is that Page 1 graduation year type checked
  wrapper.setState({ fname: 'Krishna', lname: 'Pandian', age: '1a', gender: 'Male', gender_string: '', graduation: '20ab', student: 'Yes', affiliation: '10', hackathon: 'Yes', participate: '***', transportation: 'Yes', accomodations: "lol" });
  expect(wrapper.instance().validate()).toBe(1)
  //error is that Page 1 age type checked
});
