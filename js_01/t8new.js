window.onload = function() {

	const App = Vue.createApp({
		data() {
			return {
				sexFliter: -1,
				showDatas: [],
				searchKey: ""
			}
		},
		mounted() {
			// setTimeout(this.queryAllData, 1000)
			this.queryAllData()
		},
		methods: {
			async queryAllData() {
				try {
					const response = await fetch('get_users.php'); // 调用PHP API
					const data = await response.json(); // 解析JSON响应
					this.showDatas = data; // 设置数据到Vue实例
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
			async fliterData() {
				this.searchKey = ""
				try {
					const response = await fetch('get_users.php'); // 调用PHP API
					const data = await response.json(); // 解析JSON响应
					this.showDatas = data; // 设置数据到Vue实例

					if (this.sexFliter == -1) {
						this.showDatas = data
					} else {
						this.showDatas = data.filter((data1) => {
							return data1.sex == this.sexFliter
						})
					}
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
			async searchData() {
				this.sexFliter = -1
				try {
					const response = await fetch('get_users.php'); // 调用PHP API
					const data = await response.json(); // 解析JSON响应
					this.showDatas = data; // 设置数据到Vue实例
					if (this.searchKey.length == 0) {
						this.showDatas = data
					} else {
						this.showDatas = data.filter((data2) => {
							return data2.name.search(this.searchKey) != -1
						})
					}
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
		},

		watch: {
			sexFliter(oldValue, newValue) {
				this.fliterData()
			},
			searchKey(oldValue, newValue) {
				this.searchData()
			}
		}
	})


	App.mount("#Application")
}