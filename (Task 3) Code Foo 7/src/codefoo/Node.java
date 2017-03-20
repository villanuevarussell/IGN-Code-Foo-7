/**
 *
 * @author Russell
 */
package codefoo;
import java.util.ArrayList;

public class Node 
{
  private int value;
  private boolean used; 
  private ArrayList <Node> neighbors = new ArrayList<Node>();
  
  Node(int gridValue)
  {
    value = gridValue;
    
    
  }
  
  public void changeValue(int i)
  {
      value = i;
  }
  public int getValue()
  {
      return value;
  }
  public void putNeighbors(Node node)
  {
      
      neighbors.add(node);
  }
  

  public int neighborSize()
  {

      return neighbors.size();
  }
  
  public boolean getFlag()
  {
     return used;
  }
  
  public void flag()
  {
      used = true;
  }
  public void clearFlag()
  {
     used = false; 
  }
  
  public int solve(ArrayList <Integer> equation)
  {
     int sum = 0;
     int count = 0;
     for(int i = 0; i < neighbors.size();i++)
     {
       
       //System.out.println(count);
       sum = 0;
       equation.clear();
       sum = value + neighbors.get(i).getValue();
       equation.add(value);
       flag();
       equation.add(neighbors.get(i).getValue());
       neighbors.get(i).flag();
       
       if(sum < 9)
       {
         solve(neighbors.get(i),sum,equation);
       }else
       if(sum == 9)
       {
         System.out.println("Equations:");
         for(int j = 0; j < equation.size();j++)
         {            
            System.out.print(equation.get(j));
            if(j < equation.size()-1)
            {
              System.out.print("+");
            }
         }
       }
     }
     

     return 0;
  }
  
  private int solve(Node node, int sum,ArrayList<Integer> newEquation)
  {
    for(int i = 0;i<this.neighbors.size();i++)
    {
      if(this.neighbors.get(i).getFlag()==false)
      {   
       System.out.println(this.neighbors.get(i).getValue());
      }
    }
    
      
   return 0;
  }

  
}
