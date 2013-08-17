json.array!(@games) do |game|
  json.extract! game, :title, :numPlayers. :size
  json.url game_url(game, format: :json)
end