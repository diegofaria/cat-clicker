import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import CatDisplay from '../CatDisplay';

const cat = {
  id: 1,
  name: "catinho",
  counter: 0,
  image: "http://d39kbiy71leyho.cloudfront.net/wp-content/uploads/2016/05/09170020/cats-politics-TN.jpg"
}

const incrementCat = (id) => { cat.counter += 1 }

storiesOf('CatDisplay', module)
  .add('with a cat', () => (
    <CatDisplay cat={ {} } onIncrementCat={ incrementCat }/>
  ))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
