import * as React from 'react';
import { Form, FormSection, PageSection } from '@patternfly/react-core';
import { FormikProps } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { FormFooter } from '../../shared';
import { useFormValues } from '../form-context';
import { HelpTopicLink } from '../HelpTopicLink/HelpTopicLink';
import PageLayout from '../PageLayout/PageLayout';
import { useWizardContext } from '../Wizard/Wizard';
import { ReviewSampleComponentCard } from './ReviewSampleComponentCard';
import { ReviewSourceComponentCard } from './ReviewSourceComponentCard';

type ReviewComponentsFormProps = FormikProps<{}>;

export const ReviewComponentsForm: React.FC<ReviewComponentsFormProps> = ({
  handleSubmit,
  handleReset,
  isSubmitting,
  status,
  errors,
}) => {
  const [formState, setFormState] = useFormValues();
  const { handleReset: wizardHandleReset } = useWizardContext();
  const isSample = formState.components[0].type === 'sample';

  const footer = (
    <FormFooter
      submitLabel="Create"
      resetLabel="Back"
      handleReset={handleReset}
      handleCancel={() => {
        wizardHandleReset();
        setFormState({});
      }}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      disableSubmit={!isEmpty(errors) || isSubmitting}
      errorMessage={status?.submitError}
    />
  );

  return (
    <PageLayout
      breadcrumbs={[
        { path: '/app-studio/applications', name: 'Applications' },
        { path: '#', name: 'Create your application' },
      ]}
      title="Review your new components"
      description={
        <>
          Review your selections for the application.{' '}
          <HelpTopicLink topicId="create-app">Learn more</HelpTopicLink>
        </>
      }
      footer={footer}
    >
      <PageSection isFilled>
        <Form onSubmit={handleSubmit}>
          <FormSection>
            {isSample ? (
              <ReviewSampleComponentCard component={formState.components[0]} />
            ) : (
              <>
                {formState.components.map((component) => (
                  <ReviewSourceComponentCard
                    key={component.name}
                    component={{
                      name: component.name,
                      source: component.data.source,
                      envs: component.data.env,
                    }}
                    isExpanded={formState.components.length === 1}
                  />
                ))}
              </>
            )}
          </FormSection>
        </Form>
      </PageSection>
    </PageLayout>
  );
};
