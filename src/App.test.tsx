import { afterEach, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

afterEach(cleanup);

it('starts with neither activity selected and no summary', () => {
  render(<App />);
  for (const radio of screen.getAllByRole('radio')) {
    expect((radio as HTMLInputElement).checked).toBe(false);
  }
  expect(screen.queryByRole('heading', { name: 'Your activity setup' })).toBeNull();
});

it('rejects an empty submission with linked errors and focuses the first radio', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Confirm activity setup' }));

  expect(screen.getAllByRole('alert')).toHaveLength(2);
  const radio = screen.getByRole('radio', { name: 'Hobby' });
  const time = screen.getByRole('textbox', { name: /Available time/ });
  expect(document.activeElement).toBe(radio);
  expect(radio.getAttribute('aria-invalid')).toBe('true');
  expect(radio.getAttribute('aria-describedby')).toBe('activity-type-error');
  expect(document.getElementById('activity-type-error')?.textContent).toBe('Choose Hobby or Chore.');
  expect(time.getAttribute('aria-invalid')).toBe('true');
  expect(time.getAttribute('aria-describedby')).toContain('minutes-error');
  expect(document.getElementById('minutes-error')?.textContent).toBe('Enter your available time in minutes.');
  expect(screen.queryByRole('heading', { name: 'Your activity setup' })).toBeNull();
});

it('requires activity type even when time is valid', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByRole('textbox', { name: /Available time/ }), '15');
  await user.click(screen.getByRole('button', { name: 'Confirm activity setup' }));
  expect(screen.getByRole('alert').textContent).toBe('Choose Hobby or Chore.');
  expect(screen.queryByRole('heading', { name: 'Your activity setup' })).toBeNull();
});

it.each(['', '   ', '0', '-5', '1.5', 'abc', '1e2', 'Infinity', '9007199254740992'])(
  'rejects invalid minutes %j, focuses the input, and allows correction', async (minutes) => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('radio', { name: 'Hobby' }));
    const time = screen.getByRole('textbox', { name: /Available time/ });
    if (minutes) await user.type(time, minutes);
    await user.click(screen.getByRole('button', { name: 'Confirm activity setup' }));

    expect(screen.getAllByRole('alert')).toHaveLength(1);
    expect(time.getAttribute('aria-invalid')).toBe('true');
    expect(document.activeElement).toBe(time);
    expect(screen.queryByRole('heading', { name: 'Your activity setup' })).toBeNull();

    await user.clear(time);
    await user.type(time, '15');
    await user.click(screen.getByRole('button', { name: 'Confirm activity setup' }));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(time.getAttribute('aria-invalid')).toBe('false');
    expect(screen.getByRole('status').textContent).toContain('15 minutes');
  },
);

it.each([['Hobby', '15', '15 minutes'], ['Chore', '1', '1 minute']])(
  'submits %s and %s minutes', async (activityType, minutes, expectedTime) => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('radio', { name: activityType }));
    await user.type(screen.getByRole('textbox', { name: /Available time/ }), minutes);
    await user.click(screen.getByRole('button', { name: 'Confirm activity setup' }));

    expect(screen.queryByRole('alert')).toBeNull();
    const summary = screen.getByRole('status');
    expect(summary.textContent).toContain(activityType);
    expect(summary.textContent).toContain(expectedTime);
  },
);

it('clears the previous summary on edits and displays updated choices after resubmission', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('radio', { name: 'Hobby' }));
  const time = screen.getByRole('textbox', { name: /Available time/ });
  const submit = screen.getByRole('button', { name: 'Confirm activity setup' });
  await user.type(time, '15');
  await user.click(submit);
  await user.click(screen.getByRole('radio', { name: 'Chore' }));
  expect(screen.queryByRole('heading', { name: 'Your activity setup' })).toBeNull();
  await user.click(submit);
  expect(screen.getByRole('status').textContent).toContain('Chore');
  await user.clear(time);
  expect(screen.queryByRole('heading', { name: 'Your activity setup' })).toBeNull();
  await user.type(time, '30');
  await user.click(submit);
  expect(screen.getByRole('status').textContent).toContain('30 minutes');
});

it('supports keyboard selection and submission', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.tab();
  expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Hobby' }));
  await user.keyboard(' ');
  expect((screen.getByRole('radio', { name: 'Hobby' }) as HTMLInputElement).checked).toBe(true);
  await user.tab();
  await user.keyboard('20{Enter}');
  expect(screen.getByRole('status').textContent).toContain('Hobby');
  expect(screen.getByRole('status').textContent).toContain('20 minutes');
});

it('keeps visible questions and persistent instructions associated with the form controls', () => {
  render(<App />);
  const group = screen.getByRole('group', { name: /What are you in the mood for/ });
  expect(document.getElementById(group.getAttribute('aria-describedby')!)?.textContent)
    .toBe('Choose one activity type before submitting.');
  const time = screen.getByRole('textbox', { name: /How much time do you have/ });
  expect((time as HTMLInputElement).required).toBe(true);
  expect(document.getElementById(time.getAttribute('aria-describedby')!)?.textContent)
    .toBe('Use a positive whole number, such as 15.');
});
