import { string, object, array } from 'yup';

export const gitUrlRegex =
  /^((((ssh|git|https?:?):\/\/:?)(([^\s@]+@|[^@]:?)[-\w.]+(:\d\d+:?)?(\/[-\w.~/?[\]!$&'()*+,;=:@%]*:?)?:?))|([^\s@]+@[-\w.]+:[-\w.~/?[\]!$&'()*+,;=:@%]*?:?))$/;

// generic regext to validate container image /^[^/]+\.[^/.]+\/([a-z0-9-_]+\/)?[^/.]+(:.+)?$/
export const containerImageRegex = /^quay.io\/([a-z0-9-_]+\/)?[^/.]+(:.+)?$/;

const combineRegExps = (...regexps: RegExp[]) => {
  const regexStringsWithoutFlags = regexps.map((regex) => regex.source);
  return new RegExp(regexStringsWithoutFlags.join('|'));
};

export const validationSchema = object({
  source: string()
    .max(2000, 'Please enter a URL that is less than 2000 characters.')
    .matches(combineRegExps(gitUrlRegex, containerImageRegex), 'Invalid Source URL')
    .required('Required'),
  git: object({
    reference: string(),
    contextDir: string(),
  }),
  detectedComponents: array().defined().required(),
});
