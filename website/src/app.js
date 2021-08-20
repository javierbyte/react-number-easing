import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';

import NumberEasing from 'react-number-easing';

import { JBX, Button, HeaderH1, Text, Space, A, Ul, Li, Container, Inline, Tabs, Tab } from 'jbx';

const EASING_LIST = [
  'cubicInOut',
  'cubicIn',
  'cubicOut',
  'expoInOut',
  'expoIn',
  'expoOut',
  'linear',
  'quadInOut',
  'quadIn',
  'quadOut',
  'quartInOut',
  'quartIn',
  'quartOut',
  'quintInOut',
  'quintIn',
  'quintOut'
];

const Pre = Styled.pre({
  backgroundColor: '#ecf0f1',
  padding: '16px'
});

function App() {
  const [target, targetSet] = useState(0);
  const [currentEasing, currentEasingSet] = useState('quintInOut');

  function onRandomizeTarget() {
    targetSet(Math.floor(Math.random() * 1024));
  }

  useEffect(() => {
    onRandomizeTarget();
  }, []);

  return (
    <Container>
      <JBX accent={'#95a5a6'} />
      <HeaderH1
        style={{
          fontWeight: 900,
          display: 'inline-block',
          width: 'auto',
          padding: '6px',
          backgroundColor: 'var(--accent-color)'
        }}
      >
        react-number-easing
      </HeaderH1>
      <Space h={1} />
      <Text>React component for fancy number transitions.</Text>
      <Space h={2} />

      <Space h={1} />
      <HeaderH1 style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: -2 }}>
        <NumberEasing decimals={0} value={target} ease={currentEasing} speed={1000} />
      </HeaderH1>

      <Space h={1} />

      <Inline justifyContent="center">
        <Tab info>
          <Text>Target:</Text>
        </Tab>
        <Tab info>
          <Text style={{ fontWeight: 700 }}>{target}</Text>
        </Tab>
      </Inline>

      <Button onClick={onRandomizeTarget}>Random Target</Button>

      <Space h={1} />

      <Tabs>
        <Inline>
          <Tab info>
            <Text>Ease function: </Text>
          </Tab>
          {EASING_LIST.map((easing) => (
            <Tab
              active={currentEasing === easing}
              key={easing}
              onClick={() => {
                currentEasingSet(easing);
              }}
            >
              <Text>{easing}</Text>
            </Tab>
          ))}
        </Inline>
      </Tabs>

      <Space h={1} />
      <Pre>
        <code>
          {`import NumberEasing from 'react-number-easing';

/* Example */
<NumberEasing
  value={${target}}
  speed={1000}
  ease='${currentEasing}' />`}
        </code>
      </Pre>

      <Space h={2} />

      <Text>
        Learn how to use and more information about the props on{' '}
        <A href="https://github.com/javierbyte/react-number-easing">github</A>.
      </Text>

      <Space h={2} />
      <Text>More experiments:</Text>
      <Text>
        <Space h={0.5} />
        <Ul>
          <Li>
            <A href="https://javier.xyz/cohesive-colors/">Cohesive Colors</A>, create more cohesive color schemes.
          </Li>
          <Li>
            <A href="https://javier.xyz/visual-center/">Visual Center</A>, find the visual center of your images /
            logos.
          </Li>
          <Li>
            <A href="https://clashjs.com/">Clash.js</A>, JS AI Battle Game.
          </Li>
          <Li>
            <A href="https://javier.xyz/morphin/">morphin</A>, create animated CSS transitions with box-shadow.
          </Li>
        </Ul>
      </Text>

      <Space h={2} />
      <Text>
        Made by <A href="https://javier.xyz">javierbyte</A>.
      </Text>
    </Container>
  );
}

export default App;
