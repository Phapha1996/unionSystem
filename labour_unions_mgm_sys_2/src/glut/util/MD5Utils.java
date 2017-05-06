package glut.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;
@Component("mD5Utils")
public class MD5Utils {  
	  private static String useMD5;
    
	//静态方法，便于作为工具类  
    public static String toMD5(String plainText) {  
        try {
        	//System.out.println("useMD5:"+useMD5);
        	if(!useMD5.equals("true")){
        		return plainText;
        	}
        	
            MessageDigest md = MessageDigest.getInstance("MD5");  
            md.update(plainText.getBytes());  
            byte b[] = md.digest();  
  
            int i;  
  
            StringBuffer buf = new StringBuffer("");  
            for (int offset = 0; offset < b.length; offset++) {  
                i = b[offset];  
                if (i < 0)  
                    i += 256;  
                if (i < 16)  
                    buf.append("0");  
                buf.append(Integer.toHexString(i));  
            }  
            //32位加密  
            return buf.toString();  
            // 16位的加密  
            //return buf.toString().substring(8, 24);  
        } catch (NoSuchAlgorithmException e) {  
            e.printStackTrace();  
            return null;  
        }  
    }  
    public String getUseMD5() {
		return useMD5;
	}
	public void setUseMD5(String useMD5) {
		this.useMD5 = useMD5;
	}
}