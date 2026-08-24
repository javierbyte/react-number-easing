'use client';

import { useEffect, useState } from 'react';
import NumberEasing from 'react-number-easing';

import {
  Button,
  Text,
  Space,
  CodeSnippet,
  Inline,
  Tabs,
  Tab,
} from 'jbx';

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
  'quintOut',
];

export default function NumberEasingApp() {
  const [target, targetSet] = useState(0);
  const [currentEasing, currentEasingSet] = useState('quintInOut');

  function onRandomizeTarget() {
    targetSet((currentTarget) => {
      const nextTarget = Math.floor(Math.random() * 1024);

      return nextTarget === currentTarget ? (nextTarget + 1) % 1024 : nextTarget;
    });
  }

  function onEasingChange(easing) {
    if (easing === currentEasing) return;

    currentEasingSet(easing);
    onRandomizeTarget();
  }

  useEffect(() => {
    onRandomizeTarget();
  }, []);

  return (
    <>
      <Space h={2} />

      <Space h={1} />
      <h1
        style={{
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: -2,
          fontSize: '4rem',
        }}
      >
        <NumberEasing
          decimals={0}
          value={target}
          ease={currentEasing}
          speed={1000}
        />
      </h1>

      <Space h={1} />

      <Inline>
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
              onClick={() => onEasingChange(easing)}
            >
              <Text>{easing}</Text>
            </Tab>
          ))}
        </Inline>
      </Tabs>

      <Space h={1} />
      <div className="code-examples">
        <section className="code-example">
          <Text className="code-example-title">Install</Text>
          <CodeSnippet>
            <code>npm install react-number-easing</code>
          </CodeSnippet>
        </section>

        <section className="code-example">
          <Text className="code-example-title">Example</Text>
          <CodeSnippet>
            <code>
              {`import NumberEasing from 'react-number-easing';

/* Example */
<NumberEasing
  value={${target}}
  speed={1000}
  ease='${currentEasing}' />`}
            </code>
          </CodeSnippet>
        </section>
      </div>
    </>
  );
}
