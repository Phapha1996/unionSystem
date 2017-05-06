package glut.util;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class BeanTool {

	public BeanTool() {
		// TODO Auto-generated constructor stub
	}

	public static String[] getNullPropertyNames (Object source, String[] filtered) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();
        for(java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        //过滤
        for(String s:filtered){
        	emptyNames.add(s);
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    public static void copyPropertiesIgnoreNull2Filtered(Object src, Object target, String[] filtered){
        BeanUtils.copyProperties(src, target, getNullPropertyNames(src, filtered));
    }
}
