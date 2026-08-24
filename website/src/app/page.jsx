import { MainHeader, Text, Space, Container, A, MoreExperiments } from 'jbx';

import NumberEasingApp from '@/components/NumberEasingApp.jsx';

export default function Page() {
  return (
    <Container>
      <MainHeader>react-number-easing</MainHeader>
      <Space h={1} />
      <Text>React component for fancy number transitions.</Text>

      <NumberEasingApp />

      <Space h={2} />
      <Text>
        Learn how to use and more information about the props on{' '}
        <A href="https://github.com/javierbyte/react-number-easing">github</A>.
      </Text>

      <Space h={2} />
      <MoreExperiments exclude="react-number-easing" />

      <Space h={2} />
      <Text>
        Made by <A href="https://javier.xyz">Javier Bórquez</A>. Online since
        2015.
      </Text>
    </Container>
  );
}
