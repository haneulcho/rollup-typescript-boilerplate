import '@/styles/style.scss';

type ComponentProps = {
  text: string;
};

function Component({ text }: ComponentProps): void {
  console.log(text);
}

Component({ text: 'hi' });

import * as foo from '@/components/foo';

export default function () {
  console.log(foo);
  console.log('App is running!!!');
}