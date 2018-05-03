

export default {
	state: {
		success: null,
		error: null
	},
	notificationSystem: {
		options: {
			show: {
				theme: 'dark',
				icon: 'icon-person',
				position: 'topCenter',
				progressBarColor: 'rgb(0, 255, 184)',
				buttons: [
					['<button>Ok</button>', function (instance, toast) {
						alert("Hello world!");
					}, true],
					['<button>Close</button>', function (instance, toast) {
						instance.hide({
							transitionOut: 'fadeOutUp',
							onClosing: function(instance, toast, closedBy){
								console.info('closedBy: ' + closedBy);
							}
						}, toast, 'buttonName');
					}]
				],
				onOpening: function(instance, toast){
					console.info('callback abriu!');
				},
				onClosing: function(instance, toast, closedBy){
					console.info('closedBy: ' + closedBy);
				}
			},
			ballon: {
				balloon: true,
				position: 'bottomCenter'
			},
			info: {
				position: 'bottomLeft'
			},
			success: {
				position: 'bottomRight'
			},
			warning: {
				position: 'topLeft'
			},
			error: {
				position: 'topRight'
			},
			question: {
				timeout: 20000,
				close: false,
				overlay: true,
				toastOnce: true,
				id: 'question',
				zindex: 999,
				position: 'center',
				buttons: [
					['<button><b>YES</b></button>', function (instance, toast) {
						instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
					}, true],
					['<button>NO</button>', function (instance, toast) {
						instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
					}]
				],
				onClosing: function(instance, toast, closedBy){
					console.info('Closing | closedBy: ' + closedBy);
				},
				onClosed: function(instance, toast, closedBy){
					console.info('Closed | closedBy: ' + closedBy);
				}
			}
		}
	},
	setSuccess(message) {
		this.state.success = message
		setTimeout(() => {
			this.removeSuccess()
		}, 3000);
	},
	setError(message) {
		this.state.error = message
		setTimeout(() => {
			this.removeError()
		}, 6000);
	},
	removeSuccess() {
		this.state.success = null
	},
	removeError() {
		this.state.error = null
	}
}