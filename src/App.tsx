import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

type ActivityType = 'Hobby' | 'Chore';
type Setup = { activityType: ActivityType; minutes: number };
type Errors = { activityType?: string; minutes?: string };

export default function App() {
  const [activityType, setActivityType] = useState<ActivityType | ''>('');
  const [minutes, setMinutes] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<Setup | null>(null);
  const firstRadio = useRef<HTMLInputElement>(null);
  const timeInput = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    const value = minutes.trim();
    const parsedMinutes = Number(value);

    if (!activityType) {
      nextErrors.activityType = 'Choose Hobby or Chore.';
    }
    if (!value) {
      nextErrors.minutes = 'Enter your available time in minutes.';
    } else if (
      !/^\d+$/.test(value) ||
      !Number.isSafeInteger(parsedMinutes) ||
      parsedMinutes <= 0
    ) {
      nextErrors.minutes = 'Enter a positive whole number of minutes, such as 15.';
    }

    setErrors(nextErrors);
    setSubmitted(null);

    if (nextErrors.activityType) {
      firstRadio.current?.focus();
    } else if (nextErrors.minutes) {
      timeInput.current?.focus();
    } else if (activityType) {
      setSubmitted({ activityType, minutes: parsedMinutes });
    }
  }

  return (
    <main>
      <header className="setup-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">W</span>
          <span>Whaddo?</span>
        </div>
        <div className="intro">
          <h1>What should we do today?</h1>
          <p>Tell us a little about your situation.</p>
        </div>
      </header>
      <form noValidate onSubmit={handleSubmit} aria-label="Activity setup">
        <div className="setup-fields">
          <fieldset aria-describedby={errors.activityType ? 'activity-type-hint activity-type-error' : 'activity-type-hint'}>
            <legend>What are you in the mood for?<span className="sr-only"> (required)</span></legend>
            <div className="activity-options">
              {(['Hobby', 'Chore'] as const).map((option) => (
                <label className="radio-option" key={option}>
                  <input
                    ref={option === 'Hobby' ? firstRadio : undefined}
                    type="radio"
                    name="activityType"
                    value={option}
                    required
                    checked={activityType === option}
                    aria-invalid={Boolean(errors.activityType)}
                    aria-describedby={errors.activityType ? 'activity-type-error' : undefined}
                    onChange={() => {
                      setActivityType(option);
                      setSubmitted(null);
                      setErrors((previous) => ({ ...previous, activityType: undefined }));
                    }}
                  />
                  <span className="choice-label">{option}</span>
                </label>
              ))}
            </div>
            <p className="hint" id="activity-type-hint">Choose one activity type before submitting.</p>
            {errors.activityType && (
              <p className="error" id="activity-type-error" role="alert">
                {errors.activityType}
              </p>
            )}
          </fieldset>

          <div>
            <label className="time-label" htmlFor="minutes">
              <span>How much time do you have?<span className="sr-only"> Available time in minutes</span></span>
              <span className="requirement">required</span>
            </label>
            <div className="duration-input">
              <input
                ref={timeInput}
                id="minutes"
                name="minutes"
                type="text"
                inputMode="numeric"
                placeholder="Custom duration"
                required
                value={minutes}
                aria-invalid={Boolean(errors.minutes)}
                aria-describedby={errors.minutes ? 'minutes-hint minutes-error' : 'minutes-hint'}
                onChange={(event) => {
                  setMinutes(event.target.value);
                  setSubmitted(null);
                  setErrors((previous) => ({ ...previous, minutes: undefined }));
                }}
              />
              <span className="duration-unit" aria-hidden="true">min</span>
            </div>
            <p className="hint" id="minutes-hint">Use a positive whole number, such as 15.</p>
            {errors.minutes && (
              <p className="error" id="minutes-error" role="alert">
                {errors.minutes}
              </p>
            )}
          </div>
        </div>
        <footer className="setup-footer">
          <button type="submit">Confirm activity setup</button>
          <p className="hint">Choose an activity type and enter your available time to confirm.</p>
        </footer>
      </form>

      <div role="status" aria-live="polite" aria-atomic="true">
        {submitted && (
          <section className="summary" aria-labelledby="summary-title">
            <h2 id="summary-title">Your activity setup</h2>
            <dl>
              <dt>Activity type</dt>
              <dd>{submitted.activityType}</dd>
              <dt>Available time</dt>
              <dd>{submitted.minutes} {submitted.minutes === 1 ? 'minute' : 'minutes'}</dd>
            </dl>
          </section>
        )}
      </div>
    </main>
  );
}
