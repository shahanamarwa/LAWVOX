import db from "./database";

const caseCount = db
  .prepare("SELECT COUNT(*) as count FROM cases")
  .get() as { count: number };

if (caseCount.count === 0) {
  const insert = db.prepare(`
    INSERT INTO cases
    (case_name, case_number, court, year, category, summary, judgment)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const cases = [
    {
      name: "Kesavananda Bharati v. State of Kerala",
      number: "W.P. No. 135 of 1970",
      court: "Supreme Court of India",
      year: 1973,
      category: "Constitutional Law",
      summary: "A landmark constitutional case concerning the basic structure of the Constitution.",
      judgment: "The Supreme Court held that Parliament's power to amend the Constitution is subject to the basic structure doctrine."
    },
    {
      name: "Maneka Gandhi v. Union of India",
      number: "W.P. No. 197 of 1977",
      court: "Supreme Court of India",
      year: 1978,
      category: "Fundamental Rights",
      summary: "A major case concerning personal liberty and the interpretation of Article 21.",
      judgment: "The Court expanded the interpretation of Article 21 and emphasized that procedure affecting personal liberty must satisfy constitutional requirements."
    },
    {
      name: "Justice K.S. Puttaswamy v. Union of India",
      number: "W.P. (Civil) No. 494 of 2012",
      court: "Supreme Court of India",
      year: 2017,
      category: "Privacy",
      summary: "A landmark judgment recognizing privacy as a fundamental right.",
      judgment: "The Supreme Court recognized the constitutional right to privacy as a fundamental right."
    }
  ];

  const insertMany = db.transaction(() => {
    for (const item of cases) {
      insert.run(
        item.name,
        item.number,
        item.court,
        item.year,
        item.category,
        item.summary,
        item.judgment
      );
    }
  });

  insertMany();
}
