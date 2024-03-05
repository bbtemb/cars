const select = document.querySelector('#cars');
const name = document.querySelector('.name');
const price = document.querySelector('.price');

const getData = () => {
  return fetch('./cars.json')
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
    });
};

const listUpdate = () => {
  getData()
    .then((data) => {
      data.cars.forEach((item) => {
        const option = document.createElement('option');
        option.textContent = `${item.brand.toUpperCase()} ${item.model}`;
        option.value = item.price;
        select.append(option);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

listUpdate();

select.addEventListener('change', (e) => {
  console.log(e.target.selectedIndex);
  getData()
    .then((data) => {
      if (e.target.value === '0') {
        name.textContent = 'Выбери тачку';
      } else {
        name.textContent = `${data.cars[
          e.target.selectedIndex - 1
        ].brand.toUpperCase()} ${data.cars[e.target.selectedIndex - 1].model}`;
      }

      if (e.target.value === '0') {
        price.textContent = '';
      } else {
        price.textContent = `${data.cars[e.target.selectedIndex - 1].price}$`;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});
