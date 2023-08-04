const Nutrition = ({ mapper, item }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nutrient</th>
          <th>Amount</th>
          <th>% of Daily Needs</th>
        </tr>
      </thead>
      <tbody>
        {mapper &&
          mapper.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                {item.amount} {item.unit}
              </td>
              <td>{item.percentofdailyneeds}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Nutrition;
