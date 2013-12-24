class Board
    attr_accessor :size, :hexes
    def initialize(size)
        @hexes=Array.new(size)
        i=0;
        @hexes.each do |hex|
            hex=Hex.new(i, "random")
            i++
        end
    end
    def print
        puts('Hello')
    end
    

end

class Hex
    attr_accessor :index, :resource
    def initialize(index, resource)
        @index=index
        @resource=resource
    end

end