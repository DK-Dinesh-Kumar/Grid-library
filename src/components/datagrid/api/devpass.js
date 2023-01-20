import { createHash } from "crypto";

// I compared the derived bytes that C# generated
// to the derived bytes this generated. They're equal.

// See:
//      https://stackoverflow.com/a/69733978/12278028
//      https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.passwordderivebytes?view=net-6.0#remarks

function hashKeyNTimes(key, times, hashAlgorithm) {
  let result = key;
  for (let i = 0; i < times; i++) {
    result = createHash(hashAlgorithm).update(result).digest();
  }
  return result;
}

export function deriveBytesFromPassword(
  password,
  salt,
  iterations,
  hashAlgorithm,
  keyLength
) {
  if (keyLength < 1) throw new Error("keyLength must be greater than 1");
  if (iterations < 2) throw new Error("iterations must be greater than 2");

  const passwordWithSalt = Buffer.concat([
    Buffer.from(password, "utf-8"),
    salt,
  ]);
  const hashMissingLastIteration = hashKeyNTimes(
    passwordWithSalt,
    iterations - 1,
    hashAlgorithm
  );
  let result = hashKeyNTimes(hashMissingLastIteration, 1, hashAlgorithm);
  result = extendResultIfNeeded(
    result,
    keyLength,
    hashMissingLastIteration,
    hashAlgorithm
  );

  return result.slice(0, keyLength);
}

function calculateSpecialMicrosoftHash(
  hashMissingLastIteration,
  counter,
  hashAlgorithm
) {
  // Here comes the magic: Convert an integer that increases from call to call to a string
  // and convert that string to utf-8 bytes. These bytes are than used to slightly modify a given base-hash.
  // The modified hash is than piped through the hash algorithm.
  // Note: The PasswordDeriveBytes algorithm converts each character to utf-16 and then drops the second byte.
  const prefixCalculatedByCounter = Buffer.from(counter.toString(), "utf-8");
  const inputForAdditionalHashIteration = Buffer.concat([
    prefixCalculatedByCounter,
    hashMissingLastIteration,
  ]);
  return createHash(hashAlgorithm)
    .update(inputForAdditionalHashIteration)
    .digest();
}

function extendResultIfNeeded(
  result,
  keyLength,
  hashMissingLastIteration,
  hashAlgorithm
) {
  let counter = 1;
  while (result.length < keyLength) {
    result = Buffer.concat([
      result,
      calculateSpecialMicrosoftHash(
        hashMissingLastIteration,
        counter,
        hashAlgorithm
      ),
    ]);
    counter++;
  }
  return result;
}
