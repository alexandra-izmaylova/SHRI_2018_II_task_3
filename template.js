const container = document.querySelector(".container");

	const appendSmallCard = (title, device, time, description, src) => {
		let content = document.querySelector("#template-card-s").content;
		let card = document.importNode(content, true);
		card.querySelector(".title").innerHTML = title;
		card.querySelector(".devices").innerHTML = device;
		card.querySelector(".time").innerHTML = time;
		card.querySelector(".icons").src = src;
		if (description) {
			card.querySelector(".description_size-s").innerHTML = description;
		} else {
			card.querySelector(".card_bottom").style.display = "none";
		}
		container.appendChild(card);
	};

	appendSmallCard('Дверь открыта', 'Сенсор входной двери', '18:50, Сегодня', '', 'assets/key.svg');
	appendSmallCard('Уборка закончена', 'Пылесос', '18:45, Сегодня', '', 'assets/robot-cleaner.svg');
	appendSmallCard('Новый пользователь', 'Роутер', '18:45, Сегодня', '', 'assets/router.svg');
	appendSmallCard('Вода вскипела', 'Чайник', '16:17, Сегодня', '', 'assets/kettle.svg');
	appendSmallCard('Зарядка завершена', 'Оконный сенсор', '16:22, Сегодня', 'Ура! Устройство «Оконный сенсор» снова в строю!', 'assets/battery.svg');