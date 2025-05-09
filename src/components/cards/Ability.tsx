import Image from "next/image";

export function Ability({ ability }: { ability: string }) {
  const matches = ability.matchAll(
    /\{cost\}(?<cost>.*)\{\/cost\}(?<rest>.*$)/g,
  );

  const splitAbility = () => {
    for (const match of matches) {
      const cost = match.groups?.cost;
      const rest = match.groups?.rest;

      return {
        cost: cost ?? null,
        rest: rest ?? "",
      };
    }
    return {
      cost: null,
      rest: ability,
    };
  };

  const getIcon = (value: string) => {
    const test = value.matchAll(/\{(?<icon>.*?)\}/g);

    for (const match of test) {
      const icon = match.groups?.icon;

      if (icon != null) return icon;
    }

    return null;
  };

  const { cost, rest } = splitAbility();

  const splitCost = cost
    ?.replace("{reminder}", "<i>")
    .replace("{/reminder}", "</i>")
    .split(/(\{.*?\})/g)
    .filter((s) => s.length > 0);
  const splitRest =
    rest
      ?.replace("{reminder}", "<i>")
      .replace("{/reminder}", "</i>")
      .split(/(\{.*?\})/g)
      .filter((s) => s.length > 0) ?? [];

  return (
    <span>
      {splitCost && (
        <span className="font-bold">
          {splitCost.map((s, i) => {
            const icon = getIcon(s);

            if (icon != null)
              return (
                <Image
                  key={i}
                  src={`/icons/${icon}.webp`}
                  alt=""
                  width="20"
                  height="20"
                  className="inline-block"
                />
              );

            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: s }}
                className="[&>i]:italic"
              />
            );
          })}
        </span>
      )}
      {splitRest.map((s, i) => {
        const icon = getIcon(s);

        if (icon != null)
          return (
            <Image
              key={i}
              src={`/icons/${icon}.webp`}
              alt=""
              width="20"
              height="20"
              className="inline-block"
            />
          );

        return (
          <span
            key={i}
            dangerouslySetInnerHTML={{ __html: s }}
            className="[&>i]:italic"
          />
        );
      })}
    </span>
  );
}
