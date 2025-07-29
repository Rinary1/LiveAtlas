export function getPluralMessage(
  msg: { one: string; few: string; many: string },
  count: number
): string {
  const mod10 = count % 10
  const mod100 = count % 100

  let template = msg.many
  if (mod10 === 1 && mod100 !== 11) template = msg.one
  else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    template = msg.few

  return template.replace('{count}', String(count))
}