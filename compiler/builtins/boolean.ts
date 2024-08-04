import type {} from './porffor.d.ts';

// 7.1.2 ToBoolean ( argument )
// https://tc39.es/ecma262/#sec-toboolean
export const __ecma262_ToBoolean = (argument: unknown): boolean => {
  const t: i32 = Porffor.rawType(argument);

  // 1. If argument is a Boolean, return argument.
  if (t == Porffor.TYPES.boolean) return argument;

  // 2. If argument is one of undefined, null, +0𝔽, -0𝔽, NaN, 0ℤ, or the empty String, return false.
  const empty_string: bytestring = '';
  if (Porffor.fastOr(
    t == Porffor.TYPES.undefined,
    argument === null,
    argument === 0,
    Number.isNaN(argument),
    argument === empty_string
  )) return false;

  // B.3.6.1 Changes to ToBoolean
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-to-boolean
  // 3. If argument is an Object and argument has an [[IsHTMLDDA]] internal slot, return false.
  // todo

  // 4. Return true.
  return true;
}

export const __Porffor_boolean_read = (ptr: Boolean): boolean => {
  return Porffor.wasm.i32.load8_u(ptr, 0, 0) != 0;
};
export const __Porffor_boolean_write = (ptr: Boolean, val: boolean) => {
  Porffor.wasm.i32.store8(ptr, val ? 1 : 0, 0, 0);
};

// 20.3.1.1 Boolean ( value )
// https://tc39.es/ecma262/#sec-boolean-constructor-boolean-value
export const Boolean = function (value: any): boolean|Boolean {
  // 1. Let b be ToBoolean(value).
  let b = __ecma262_ToBoolean(value);

  // 2. If NewTarget is undefined, return b.
  if (!new.target) return b;

  // 3. Let O be ? OrdinaryCreateFromConstructor(NewTarget, "%Boolean.prototype%", « [[BooleanData]] »).
  const O: Boolean = Porffor.allocateBytes(1);

  // 4. Set O.[[BooleanData]] to b.
  __Porffor_boolean_write(O, b);

  // 5. Return O.
  return O;
};

// 20.3.3.2 Boolean.prototype.toString ()
// https://tc39.es/ecma262/#sec-boolean.prototype.tostring
export const __Boolean_prototype_toString = (_this: Boolean) => {
  // 1. Let b be ? ThisBooleanValue(this value).
  let b = __Porffor_boolean_read(_this);

  // 2. If b is true, return "true"; else return "false".
  let out: bytestring = Porffor.allocate();
  if (b) out = 'true';
    else out = 'false';

  return out;
};

// 20.3.3.3 Boolean.prototype.valueOf ()
// https://tc39.es/ecma262/#sec-boolean.prototype.valueof
export const __Boolean_prototype_valueOf = (_this: Boolean) => {
  // 1. Return ? ThisBooleanValue(this value).
  return __Porffor_boolean_read(_this);
};