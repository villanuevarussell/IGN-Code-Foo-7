/**
 * @author Russell Villanueva
 */
package codefoo;
import java.util.HashMap;
import java.util.ArrayList;

public class CodeFoo 
{
    //used a 2D hash map for consistency when finding neighbors
    private HashMap<Integer, HashMap<Integer,Node>> grid = new HashMap<Integer, HashMap<Integer,Node>>();
    private ArrayList<ArrayList <Node>> neighbors = new ArrayList<ArrayList <Node>>();
    private ArrayList <Integer> equation = new ArrayList<Integer>();
       
    CodeFoo()
    {      
        createGrid();      
    }
    
    private void createGrid()
    {
        //creates a 2 Key hashmap
        for(int i = 0; i < 3;i++)
        {
            grid.put(i, new  HashMap<Integer,Node>());
        }
        //creates grid with random numbers
        for(int i = 0;i< 3;i++)
        {
            for(int j = 0 ; j<3;j++)
            {
                grid.get(i).put(j,new Node((int)(Math.random()*9)));
            }
        }
        
        //adds neighbors to each node
        getNeighbors();
            
    }
        
    private void getNeighbors()
    { 
        //initializes the 2D ArrayList with 3 lines for  3x3 grid
        for(int i = 0;i<3;i++)
        {
        neighbors.add(new ArrayList<Node>());
        }
        
        //adds all neighboring nodes into each Node on grid
        for (int i = 0; i < 3; i++) {
             for (int j = 0; j < 3; j++) {
                for (int i1 = Math.max(0, i -1); i1 < Math.min(3, i + 2); i1++) {
                    for (int j1 = Math.max(0, j -1); j1 < Math.min(3, j + 2); j1++) {
                        if (i1 != i || j1 != j)
                        {
                           grid.get(i).get(j).putNeighbors(grid.get(i1).get(j1));
                        }                            
                    }
                }
             }
        }      
    }
    //prints grid
    public void printGrid()
    {
       for(int i = 0; i < 3; i ++)
       {
           for(int j = 0; j < 3; j++)
           {
               
               System.out.print(grid.get(i).get(j).getValue());
               
           }
           System.out.println();
       }
    }
    
    public void solve()
    {
      grid.get(0).get(0).changeValue(5);
      grid.get(0).get(1).changeValue(2);
      grid.get(1).get(1).changeValue(2);

      //for(int i = 0;i < 3;i++)
      //{
         // for(int j = 0; j < 3;j++)
          //{

            grid.get(0).get(0).solve(equation);
          //}
     // }
    } 

    
    
    public static void main(String[] args) 
    {
      CodeFoo grid = new CodeFoo();

      grid.solve();
      grid.printGrid();
      
    }   
    
    
}
