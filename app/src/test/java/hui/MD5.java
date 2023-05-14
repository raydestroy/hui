package hui;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5
{
	public static void main(String args[])
	{//e10adc3949ba59abbe56e057f20f883e 
		// e10adc3949ba59abbe56e057f20f883e
		// 8711c5db34d3b623b11a5f9a8e4dcf4e 566642
		String a = "e10adc3949ba59abbe56e057f20f883e566642";
		System.out.println("" + md5(a));

	}

	public static String md5(String key)
	{
		String cacheKey;
		try
		{
			final MessageDigest mDigest = MessageDigest.getInstance("MD5");
			mDigest.update(key.getBytes("UTF-8"));

			byte[] bytes = mDigest.digest();
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < bytes.length; i++)
			{
				String hex = Integer.toHexString(0xFF & bytes[i]);
				if (hex.length() == 1)
				{
					sb.append('0');
				}
				sb.append(hex);
			}
			cacheKey = sb.toString();

			// cacheKey = bytesToHexString(mDigest.digest());
		} catch (NoSuchAlgorithmException e)
		{
			cacheKey = String.valueOf(key.hashCode());
		} catch (UnsupportedEncodingException e)
		{
			cacheKey = String.valueOf(key.hashCode());
		}
		return cacheKey;
	}

}
