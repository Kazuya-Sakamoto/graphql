<template>
	<div>
		<b-card title="映画監督" class="mt-4">
			<b-form class="text-left">
				<b-form-group
					label="監督名"
					label-for="input-director-name"
					>
					<b-form-input
						v-model="form.director.name"
						id="input-director-name"
						type="text"
						placeholder="監督名"
						size="sm"
						required
					/>
				</b-form-group>
				<b-form-group
					label="年齢"
					label-for="input-director-age"
					>
					<b-form-input
						v-model="form.director.age"
						id="input-director-age"
						type="number"
						placeholder="年齢"
						size="sm"
						required
					/>
				</b-form-group>
				<b-button type="submit" variant="outline-info" class="text-left">登録</b-button>
			</b-form>
		</b-card>

		<b-card title="映画作品" class="mt-4">
			<b-form @submit.prevent="addMovie" class="text-left"> 
				<b-form-group
					label="映画作品名"
					label-for="input-movie-name"
					>
					<b-form-input
						v-model="form.movie.name"
						id="input-movie-name"
						type="text"
						placeholder="映画名"
						size="sm"
						required
					/>
				</b-form-group>
				<b-form-group
					label="ジャンル"
					label-for="input-director-genre"
					>
					<b-form-input
						v-model="form.movie.genre"
						id="input-director-genre"
						type="text"
						placeholder="ジャンル"
						size="sm"
						required
					/>
					<b-form-group
						label="監督"
						label-for="input-movie-director"
					>
					<b-form-select 
						v-model="form.movie.directorId"
						size="sm"
					>
						<b-form-select-option 
							v-for="director in directors" 
							:value="director.id" 
							:key="director.id"
						>{{ director.name }}</b-form-select-option>
					</b-form-select>
					</b-form-group>
				</b-form-group>
				<b-button type="submit" variant="outline-info" class="text-left">登録</b-button>
			</b-form>
		</b-card>
	</div>
</template>

<script>
import { MOVIE_LIST, DIRECTOR_LIST, ADD_MOVIE } from '../graphql/queries'
export default {
	name: "Sidenav",
	apollo: {
		directors: DIRECTOR_LIST 
	},
	data() {
		return {
			form: {
				director: {
					name: "",
					age: ""
				},
				movie: {
					name: "",
					genre: "",
					directorId: ""
				}
			}
		}
	},
	methods: {
		// * 映画の追加
		addMovie() {
			const { name, genre, directorId } = this.form.movie
			this.$apollo.mutate({
				mutation: ADD_MOVIE,
				variables: {
					name,
					genre,
					directorId
				},
				// * reload せずに値を更新する
				update: (store, { data: {addMovie}}) => {
					const data = store.readQuery({ query: MOVIE_LIST })

					data.movies.push(addMovie)
					store.writeQuery({ query: MOVIE_LIST, data })
				}
			}).then((data) => {
				console.log(data)
			}).catch((error) => {
				console.log(error)
			})
		}
	}
}
</script>

<style lang="scss" scoped>

</style>