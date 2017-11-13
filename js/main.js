document.addEventListener("DOMContentLoaded", () => {
	class Timer {
		constructor(elementId, options = {enableControl: false}) {
			this.canvas = document.getElementById(elementId);
			this.ctx = this.canvas.getContext('2d');
			this.value = 0;
			this.controllEnabled = options['enableControl'];
			this.start();
			if (this.controllEnabled) {
				this.canvas.addEventListener('click', (event) => {
					this._clickButton(this._getMousePosition(event))
				}, false)
			}

		}

		start() {
			this.timer = setInterval(() => {
				this.value += 1;
				this.render();
			}, 1000)
		}

		pause() {
			clearInterval(this.timer);
			this.timer = null;
		}

		stop() {
			this.value = 0;
			this.render();
		}

		render() {
			this.ctx.clearRect(0, 0, 300, 300);
			this._renderTimer();
			this._renderArrow();
			if (this.controllEnabled) {
				this._renderControllButton();
				this._renderResetButton();
			}
		}

		toggleControl() {
			if (this.timer) {
				this.pause()
			} else {
				this.start()
			}
		}

		destroy() {
			clearInterval(this.timer);
		}

		_getMousePosition(event) {
			const rect = this.canvas.getBoundingClientRect();
			return {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top
			};
		}

		_clickButton(position) {
			if (this._isInside(position, this.controlPosition)) {
				this.toggleControl()
			}

			if (this._isInside(position, this.resetPosition)) {
				this.stop()
			}
		}

		_isInside(pos, rect) {
			return pos.x > rect.x && pos.x < rect.x + rect.w && pos.y < rect.y + rect.h && pos.y > rect.y
		}

		_renderTimer() {
			const ctx = this.ctx;
			ctx.save();
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.arc(150, 170, 120, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();

			ctx.save();
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.arc(150, 170, 2, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();

			ctx.save();
			ctx.lineWidth = 5;
			ctx.translate(150, 170);
			for (let i = 0; i < 60; i++) {
				ctx.beginPath();
				ctx.moveTo(110, 0);
				ctx.lineTo(112, 0);
				ctx.stroke();
				ctx.rotate(Math.PI / 30);
			}
			ctx.translate(0, 0);
			ctx.restore();

		}

		_renderControllButton() {
			this.controlPosition = {x: 135, y: 11, w: 30, h: 40};
			this.ctx.beginPath();
			this.ctx.strokeRect(this.controlPosition.x, this.controlPosition.y, this.controlPosition.w, this.controlPosition.h,);
		}

		_renderResetButton() {
			const ctx = this.ctx;
			this.resetPosition = {x: 74, y: 42, w: 30, h: 30};
			ctx.save();
			ctx.translate(this.resetPosition.x, this.resetPosition.y);
			ctx.rotate(-27 * (Math.PI / 180));
			ctx.beginPath();
			ctx.strokeRect(0, 0, this.resetPosition.w, this.resetPosition.h,);
			ctx.restore();
		}

		_renderArrow() {
			const ctx = this.ctx;
			ctx.save();
			ctx.translate(150, 170);
			ctx.rotate(this.value * Math.PI / 30);
			ctx.fillStyle = "#000";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -110);
			ctx.stroke();
			ctx.restore();
		}

	}

	const timer = new Timer('timer', {enableControl: true});
});