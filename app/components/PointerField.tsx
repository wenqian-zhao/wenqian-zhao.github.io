export function PointerField() {
  return <><div className="pointerField" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <span className="meteorTail" key={index} />)}</div><script src="/pointer-field.js?v=flow-1" defer /></>;
}
